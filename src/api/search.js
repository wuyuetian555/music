import request from "@/utils/request";

export const findsearchSuggest = ({keywords,limit }) => {
    return request('/cloudsearch', 'get', { keywords,limit  })
}