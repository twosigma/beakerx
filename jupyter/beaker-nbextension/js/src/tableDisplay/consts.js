define(function() {

  var scopeData = {
    allStringTypes: [
      {type: 0, name: 'string'},
      {type: 10, name: 'html'}
    ],
    allTimeTypes: [
      {type: 8, name: 'datetime'},
      {type: 0, name: 'string'}
    ],
    allIntTypes: [
      {type: 0, name: 'string'},
      {type: 1, name: 'integer'},
      {type: 2, name: 'formatted integer'},
      {type: 8, name: 'datetime'}
    ],
    allDoubleTypes: [
      {type: 0, name: 'string'},
      {type: 3, name: 'double'},
      {type: 4, name: 'double with precision'},
      {type: 6, name: 'exponential 5'},
      {type: 7, name: 'exponential 15'}
    ],
    allBoolTypes: [
      {type: 0, name: 'string'},
      {type: 9, name: 'boolean'}
    ],
    allTypes: [
      {type: 0, name: 'string'},
      {type: 1, name: 'integer'},
      {type: 2, name: 'formatted integer'},
      {type: 3, name: 'double'},
      {type: 4, name: 'double with precision'},
      {type: 6, name: 'exponential 5'},
      {type: 7, name: 'exponential 15'},
      {type: 8, name: 'datetime'},
      {type: 9, name: 'boolean'},
      {type: 10, name: 'html'}
    ],
    rowsToDisplayMenu: [
      [10, 25, 50, 100, -1],
      [10, 25, 50, 100, 'All']
    ]
  };

  return {
    scopeData: scopeData,
    CELL_TYPE: 'bko-tabledisplay',
    ROW_HEIGHT: 27,
    ROW_HEIGHT_ADVANCED_MODE: 22,
    DEFAULT_PAGE_LENGTH: 25,
    MIN_ROWS_FOR_PAGING: 25,
    FC_LEFT_SEPARATOR_CLASS: 'left-fix-col-separator',
    FC_RIGHT_SEPARATOR_CLASS: 'right-fix-col-separator',
    TIME_UNIT_FORMATS: {
      DATETIME:     { title: 'datetime', format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ' },
      DAYS:         { title: 'date', format: 'YYYY-MM-DD' },
      HOURS:        { title: 'hours', format: 'YYYY-MM-DD HH:mm ZZ' },
      MINUTES:      { title: 'minutes', format: 'HH:mm ZZ' },
      SECONDS:      { title: 'seconds', format: 'HH:mm:ss ZZ' },
      MILLISECONDS: { title: 'milliseconds', format: 'HH:mm:ss.SSS ZZ' }
    }
  };

});