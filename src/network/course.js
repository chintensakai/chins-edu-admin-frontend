import { request } from './request'

const course_base_url = 'service.course/edu-course'

// 添加课程
export function addCourseInfo(courseInfo) {
    return request({
        method: 'post',
        url: course_base_url + '/add-course',
        data: courseInfo
    })
}
