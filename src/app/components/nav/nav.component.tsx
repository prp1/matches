import * as React from 'react'
import { NavComponentProps } from "./nav.interfaces";
import { observer } from "mobx-react";
const styles = require('./nav.styles.scss');

export const NavComponent = observer((props: NavComponentProps) => {

    return (
        <nav className={styles.nav}>
            <div className={styles.title}>{props.title}</div>
        </nav>
    )

});
