import { gql } from "@apollo/client";

export const GET_POST = gql`
    query GetPost {
        getPosts {
            content
            _id
            tags
            imgUrl
            authorId
            author {
            username
            name
            avatar
            }
            comments {
            content
            username
            createdAt
            updateAt
            }
            likes {
            username
            createdAt
            updateAt
            }
            createdAt
            updateAt
            }
    }
    `