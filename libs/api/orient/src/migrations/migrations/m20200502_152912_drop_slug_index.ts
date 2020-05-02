
import {migration} from '../manager';

module.exports = migration(
  "drop slug index",
  [
    // UP commands
    [
      `DROP INDEX V.slug`,
      `DROP INDEX Item.l_lon`,
    ],
    // DOWN commands
    [
      ``,
    ]
  ]
)
