# misparim
JavaScript library to convert numbers to their Hebrew string representation

Usage:

    mispar(number, gender)
    - number: the number to represent. Must be a integer in the range [0, 999,999,999,999,999].
    - gender: 'male' or 'female'. Defaults to 'female' if not provided.

Examples:

    mispar(1, 'male')       // => 'אחד'
    misapr(11, 'male')      // => 'אחד עשר'
    mispar(37, 'male')      // => 'שלושים ושבעה'
    mispar(37, 'female')    // => 'שלושים ושבע'
    mispar(37)              // => 'שלושים ושבע'
