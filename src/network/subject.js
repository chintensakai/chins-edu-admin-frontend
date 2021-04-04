import { request } from './request'

let subject_base_url = '/service.subject/edu-subject'

export function getAllSubjectTree() {
    return request({
        method: 'get',
        url: subject_base_url + '/all-subjects'
    })
}