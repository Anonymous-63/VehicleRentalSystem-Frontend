import { AgGridReact } from 'ag-grid-react';
import React, { useMemo } from 'react'

const ReportGrid = (props) => {
    const { gridRef, rowData, columnDefs, pagination = false, handleUpdate } = props

    const defaultColDef = useMemo(() => {
        return {
            wrapText: true,
        };
    })

    const gridOptions = {
        autoSizeStrategy: {
            type: 'fitCellContents',
        },
    };

    return (
        <div className='h-full w-full'>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={pagination}
                gridOptions={gridOptions}
            />
        </div>
    )
}

export default ReportGrid