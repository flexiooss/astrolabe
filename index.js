import './generated/io/package'
import {deepKeyAssigner} from '@flexio-oss/js-generator-helpers'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'
import {YearList} from './src/js/types/calendar/YearList'

/**
 * @property {DateExtended}  DateExtended
 */
deepKeyAssigner(globalFlexioImport, 'io.flexio.calendar_generator.types.YearList', YearList)

export {ComponentAstrolabeBuilder} from './src/js/ComponentAstrolabeBuilder'
