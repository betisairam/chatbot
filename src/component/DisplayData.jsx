import React from 'react'

export const DisplayData = (props) => {
    return (
        <table className="table table-bordered mt-2">
            <thead>
                <tr>
                    <th scope="col">Questions already exists</th>
                </tr>
            </thead>
            <tbody>
                {props.getData.map((data, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                {data}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
