import { getCustomRepository } from "typeorm"
import { TagsRespositories } from "../repositories/TagsRepositories"
import { classToPlain } from "class-transformer"


class ListTagsService {

    async execute() {
        const tagsRepositories = getCustomRepository(TagsRespositories);

        const tags = await tagsRepositories.find();


        return classToPlain(tags);
    }

}

export { ListTagsService }