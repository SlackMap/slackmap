
import {migration} from '../manager';

module.exports = migration(
  "drop slug index",
  [
    // UP commands
    [
      `DROP INDEX V.slug`,
    ],
    // DOWN commands
    [
      ``,
    ]
  ]
)
