import { request } from './request'

let teacher_base_url = '/service.teacher/edu-teacher'

export function getAllTeacherPage(current, size) {
    return request({
        method: 'get',
        url: teacher_base_url + '/get-all-teacher-page/' + current + "/" + size
    })
}
