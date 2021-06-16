import { request } from './request'

const chapter_base_url = 'eduservice/edu-chapter'

// 查询课程下的章节
export function getCourseChapters(courseId) {
    return request({
        method: 'get',
        url: chapter_base_url + '/get-course-chapters/' + courseId
    })
}

// 添加章节
export function addCourseChapters(chapter) {
    return request({
        method: 'post',
        url: chapter_base_url + '/chapter',
        data: chapter
    })
}

// 删除章节
export function deleteCourseChapters(chapterId) {
    return request({
        method: 'delete',
        url: chapter_base_url + '/chapter/' + chapterId
    })
}

// 修改章节
export function updateCourseChapters(chapter) {
    return request({
        method: 'put',
        url: chapter_base_url + '/chapter',
        data: chapter
    })
}

// 获取章节信息
export function getCourseChapterById(chapterId) {
    return request({
        method: 'get',
        url: chapter_base_url + '/chapter/' + chapterId
    })
}
