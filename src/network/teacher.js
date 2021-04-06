import { request } from './request'

const teacher_base_url = '/service.teacher/edu-teacher'

export function getAllTeacherPage(current, size) {
    return request({
        method: 'get',
        url: teacher_base_url + '/get-all-teacher-page/' + current + "/" + size
    })
}

export function searchTeacherByCondition(condition) {
    return request({
        method: 'post',
        data: condition,
        url: teacher_base_url + '/find-teacher'
    })
}

export function deletebyId(id) {
    return request({
        method: 'delete',
        url: teacher_base_url + '/' + id
    })
}

export function addTeacher(teacher) {
    return request({
        method: 'post',
        url: teacher_base_url + "/add-teacher",
        data: teacher
    })
}

export function getTeacherById(id) {
    return request({
        method: 'get',
        url: teacher_base_url + "/teacher/" + id
    })
}

export function updateTeacher(teacher) {
    return request({
        method: 'put',
        url: teacher_base_url + "/teacher/" + teacher.id,
        data: teacher
    })
}