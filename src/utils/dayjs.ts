import dayjs from "dayjs";
import zhCn from "dayjs/locale/zh-cn";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.locale(zhCn);

export { dayjs };
export default dayjs;
