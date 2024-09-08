import AjaxService from '@/features/core/ajax/service'

declare function getConfig (): { host: string }

const ajaxService = new AjaxService(getConfig().host)

export default ajaxService
