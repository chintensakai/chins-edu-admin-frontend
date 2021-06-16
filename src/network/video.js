import { request } from './request'
const video_base_url = "/videoservice/edu-video"
export function addVideo(video) {
    return request({
        url: video_base_url + "/video",
        method: "post",
        data: video
    })
}

export function deteleVideo(videoId) {
    return request({
        method: "delete",
        url: video_base_url + "/video/" + videoId
    })
}

export function updateVideo(video) {
    return request({
        method: "put",
        url: video_base_url + "/video",
        data: video
    })
}
