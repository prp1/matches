import * as React from 'react'
import { NavComponentProps } from "./nav.interfaces";
import { observer } from "mobx-react";
const styles = require('./nav.scss');

export const Nav = observer((props: NavComponentProps) => {

    return (
        <nav className={styles.nav}>
            <div className={styles.title}>{props.title}</div>
        </nav>
    )

});
