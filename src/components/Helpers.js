import React from "react";
import NumberFormat from 'react-number-format';

export function calculateInterest(adb, interest, daysInMonth) {
    return (((adb * daysInMonth) / 360) * (interest / 100)) * (0.8);
}

export function currentDaysInMonth() {
    // Use 1 for January, 2 for February, etc.
    let d = new Date();
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

export function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        decimalScale={2}
        prefix="₱ "
      />
    );
}