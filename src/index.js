'use strict'

import alfy from 'alfy'
import browserslist from 'browserslist'

import { SupportTable } from './SupportTable.js'
import { filterFeatures } from './features.js'
import { exactMatch } from './utils.js'

const { browsersListConfig } = process.env

alfy
  .fetch('https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json', {
    maxAge: 3600 * 12,
  })
  .then((res) => {
    // console.log(JSON.stringify(res))
    const match = exactMatch(alfy.input, res.data)

    if (match) {
      const supportTable = new SupportTable({
        featureId: match,
        db: res,
        browsersList: browserslist(browsersListConfig),
      })

      return alfy.output(supportTable.alfredItems)
    } else {
      const featureSelectionList = filterFeatures(alfy.input, res)
      return alfy.output(featureSelectionList)
    }
  })
  .catch(alfy.error)
