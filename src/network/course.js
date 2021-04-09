import { request } from './request'

const course_base_url = '/service.course/edu-course'

// 添加课程
export function addCourseInfo(courseInfo) {
    return request({
        method: 'post',
        url: course_base_url + '/add-course',
        data: courseInfo
    })
}

// 根据id查询课程信息
export function getCourseInfoById(courseId) {
    return request({
        method: 'get',
        url: course_base_url + '/get-course-info/' + courseId
    })
}

// 修改课程
export function updateCourseInfo(courseInfoVo) {
    return request({
        method: 'put',
        url: course_base_url + '/update-course-info',
        data: courseInfoVo
    })
}