import './generated/io/package'
import {deepKeyAssigner} from '@flexio-oss/js-generator-helpers'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {YearList} from './src/js/types/calendar/YearList'

/**
 * @property {DateExtended}  DateExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.astrolabe.types.YearList', YearList)
