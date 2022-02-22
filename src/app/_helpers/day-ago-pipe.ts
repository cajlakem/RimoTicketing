import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'DayAgo',
})
export class DayAgoPipe implements PipeTransform {
  transform(value: any) {
    if (value) {
      const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
      const today = new Date()
      const firstDate = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
      )

      var parts = value.split('.')
      // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
      // January - 0, February - 1, etc.
      var nextDate = new Date(
        parts[2] as any,
        (parts[1] as any) - 1,
        parts[0] as any,
      )

      const secondDate = new Date(
        nextDate.getFullYear(),
        nextDate.getMonth() + 1,
        nextDate.getDate(),
      )
      const diffDays = Math.round(
        Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay),
      )
      if (diffDays === 0) {
        return 'Heute'
      } else {
        let key
        diffDays == 1 ? key = "Tag" : key = "Tagen"
        return 'vor ' + diffDays + ' ' + key
      }
    }
    return value
  }
}
