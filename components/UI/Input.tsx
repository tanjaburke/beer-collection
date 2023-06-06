import { FilterAction } from "@/types";
import { useEffect, useState, useContext } from "react";

import styles from './Input.module.css'
import InputContext from "@/store/inputStore";

type InputProps = {
  classes: string;
  label: string;
  type: string;
  id: string;
  onChange: () => void;
}

export default function Input(props: InputProps) {
  const inputCtx = useContext(InputContext)
  const [checked, setChecked] = useState<boolean>();

  useEffect(()=> {
    if (inputCtx.checkedInputBoxes.includes(props.id)) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [inputCtx.checkedInputBoxes])

  const toggle = () => {
    props.onChange();
    inputCtx.handleFilterInput(props.id)
  }
  return (
    <>
      <input
        className={props.classes}
        id={props.id}
        type={props.type}
        checked={checked}
        onChange={toggle}
      />
      <label className={styles.label} htmlFor={props.id}>{props.label}</label>
    </>
  );
}
