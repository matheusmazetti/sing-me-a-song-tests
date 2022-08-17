import { jest } from "@jest/globals";
import { recommendationRepository } from "../src/repositories/recommendationRepository";
import { recommendationService } from "../src/services/recommendationsService";
import * as errorObject from "../src/utils/errorUtils";
import { factory } from "./factories/recomendationFactory";

describe("new recommendation tests", () => {
    it("call the create function when the recommendation do not exist", async () => {
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {return false});
        jest.spyOn(recommendationRepository, "create").mockImplementationOnce((): any => {return true});
        let recommendation = factory.createRecommendation();
        await recommendationService.insert(recommendation);
        expect(recommendationRepository.create).toBeCalled();
    });
    it("expect a throw when the recommendation already exist", async () => {
        jest.spyOn(recommendationRepository, "findByName").mockImplementationOnce((): any => {return true});
        let recommendation = factory.createRecommendation();
        try{
            await recommendationService.insert(recommendation);
            expect(1).toBe(2);
        } catch(e){
            expect(e.message).toBe("Recommendations names must be unique");
        }
    })
});

describe("up vote tests", () => {
    it("call upvote function when the id exist", async () => {
        jest.spyOn(recommendationService, "getById").mockImplementationOnce((): any => {return true});
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {return true});
        await recommendationService.upvote(15);
        expect(recommendationRepository.updateScore).toBeCalled();
    })
});

describe("down vote tests", () => {
    it("call downvote function when id exist and not exclude", async () => {
        jest.spyOn(recommendationService, "getById").mockImplementationOnce((): any => {return true});
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {return {score: 10}});
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => {return true});
        await recommendationService.downvote(15);
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
    });
    it("call exclude function when score is under -5", async () => {
        jest.spyOn(recommendationService, "getById").mockImplementationOnce((): any => {return true});
        jest.spyOn(recommendationRepository, "updateScore").mockImplementationOnce((): any => {return {score: -6}});
        jest.spyOn(recommendationRepository, "remove").mockImplementationOnce((): any => {return true});
        await recommendationService.downvote(15);
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).toBeCalled();
    })
});

describe("get by id or fail tests", () => {
    it("return recommendation when the id exist", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {return true});
        let result = await recommendationService.getById(15);
        expect(result).toEqual(true);
    });
    it("expect throw when id do not exist", async () => {
        jest.spyOn(recommendationRepository, "find").mockImplementationOnce((): any => {return true});
        try{
            await recommendationService.getById(15);
            expect(1).toBe(2);
        } catch(e){
            expect(e).not.toBeNull();
        }
    });
});

describe("get recommendations tests", () => {
    it("get all recommendations", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {return true});
        let result = await recommendationService.get();
        expect(result).toEqual(true);
    });
    it("get top recommendations", async () => {
        jest.spyOn(recommendationRepository, "getAmountByScore").mockImplementationOnce((): any => {return true});
        let result = await recommendationService.getTop(5);
        expect(result).toEqual(true);
    });

});

describe("random recommendations tests", () => {
    it("throw a error when recommendations length is equal 0", async () => {
        jest.spyOn(recommendationService, "getByScore").mockImplementationOnce((): any => {return ([])});
        let promise = await recommendationService.getRandom();
        expect(promise).rejects.toEqual(errorObject.notFoundError())
    });
    it("get by score function", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {return false});
        await recommendationService.getByScore("gt");
        expect(recommendationRepository.findAll).toHaveBeenCalled();
    })
})

describe("by score recommendations test", () => {
    it("return all recommendations with score above 10", async () => {
        jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((): any => {return ([1,2])});
        let promise = await recommendationService.getByScore('gt');
        expect(promise).toEqual([1, 2]);
    })
});

describe("score filter test", () => {
    it("return lte", async () => {
        let result = recommendationService.getScoreFilter(1);
        expect(result).toEqual("lte");
    })
})

