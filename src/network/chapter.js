import { request } from './request'

const chapter_base_url = 'service.chapter/edu-chapter'

// 添加课程
export function getCourseChapters(courseId) {
    return request({
        method: 'get',
        url: chapter_base_url + '/get-course-chapters/' + courseId
    })
}
