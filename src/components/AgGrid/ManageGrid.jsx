import { AllCommunityModule, ModuleRegistry, RowSelectionModule } from "ag-grid-community";
import { AgGridReact } from 'ag-grid-react'
import React, { useCallback, useMemo } from 'react'

ModuleRegistry.registerModules([RowSelectionModule, AllCommunityModule])

const ManageGrid = (props) => {
    const { gridRef, rowData, columnDefs, pagination = false, handleUpdate } = props

    const defaultColDef = useMemo(() => {
        return {
            wrapText: true,
        };
    })

    const rowSelection = useMemo(() => {
        return {
            mode: 'multiRow',
        };
    }, []);

    const gridOptions = {
        autoSizeStrategy: {
            type: 'fitCellContents',
        },
    };

    const onRowDoubleClicked = useCallback(event => handleUpdate(event.data), [])

    return (
        <div className='h-full w-full'>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={pagination}
                rowSelection={rowSelection}
                onRowDoubleClicked={onRowDoubleClicked}
                gridOptions={gridOptions}
            />
        </div>
    )
}

export default ManageGrid