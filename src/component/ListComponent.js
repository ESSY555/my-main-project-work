import React from 'react'

export default function ListComponent({ key, data_set }) {
    return (
        <li
            onClick={() => {
                checkAnswer(key, data.option.a);
            }}
            className="btn btn-outline-primary p-2"
        >
            A: {data.option.a}
        </li>
    )
}
