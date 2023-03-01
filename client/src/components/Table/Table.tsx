import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { CustomButton } from '../Button/Button';
import { CustomModal } from '../CustomModal/CustomModal';
import { AddItem } from '../AddItem/AddItem';
import { EditItem } from '../EditItem/EditItem';
import { useDeleteItemsMutation, useGetItemsQuery } from '../../store/itemApi';
import { useNavigate } from 'react-router-dom';
import { MessageBox } from '../MessageBox/MessageBox';
import { toast, ToastContainer } from "react-toastify";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { BASE_URL } from '../../helpers/axios';
interface Data {
    id: number,
    name: string,
    current_bid: number,
    start_price: number,
    endOfAuction: Date,
    starting_Date: Date,
    editButton?: void,
    image?: string,
}

function createData(
    id: number,
    name: string,
    current_bid: number,
    start_price: number,
    endOfAuction: Date,
    starting_Date: Date,
    image: string,
): Data {
    return {
        id,
        name,
        current_bid,
        start_price,
        endOfAuction,
        starting_Date,
        image,
    };
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [


    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'start_price',
        numeric: true,
        disablePadding: false,
        label: 'Starting price',
    },
    {
        id: 'current_bid',
        numeric: true,
        disablePadding: true,
        label: 'Current bid',
    },
    {
        id: 'starting_Date',
        numeric: true,
        disablePadding: true,
        label: 'starting Date',
    },
    {
        id: 'endOfAuction',
        numeric: true,
        disablePadding: false,
        label: 'End of the Auction',
    },
    {
        id: 'editButton',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };



    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    selected?: number[];
}

function EnhancedTableToolbar({ numSelected, selected }: EnhancedTableToolbarProps) {

    const [onDeleteMessageBox, setOnDeleteMessageBox] = useState(false);
    const [deleteItems] = useDeleteItemsMutation();

    const OnSubmitDeleteItems = async () => {
        // try {

        //     const responseFiles: any = await deleteItems(selected)
        //     if (responseFiles.data) {
        //         toast.success("Item deleted Successfully");
        //         setOnDeleteMessageBox(false);

        //     } else {
        //         toast.error("Item Couldn't be deleted");
        //     }

        // } catch (error) {
        //     toast.dismiss();
        //     toast.error("Item Couldn't be deleted");
        // }
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    List Items
                </Typography>
            )}
            <AddItem />

            {
                numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <MessageBox setOpen={setOnDeleteMessageBox} open={onDeleteMessageBox} title='DELETE ITEMS' content="Are you sure you want to delete these items?" onSubmit={OnSubmitDeleteItems}>
                            <IconButton onClick={() => setOnDeleteMessageBox(true)} >
                                <DeleteIcon />
                            </IconButton>
                        </MessageBox>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )
            }
        </Toolbar >
    );
}

export const TableItems = () => {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate();
    // const rows: Data[] = [
    //     createData(1, "item1", 1, 1, new Date(), new Date()),
    //     createData(2, "item2", 2, 5, new Date(), new Date()),
    //     createData(3, "item4", 3, 6, new Date(), new Date()),
    //     createData(4, "item5", 6, 7, new Date(), new Date()),

    // ];
    const [rows, setRows] = useState<Data[]>([]);
    const [showImage, setShowImage] = useState(false);
    const { data: items } = useGetItemsQuery("");

    useEffect(() => {
        console.log(items)
        const ROWS: Data[] = [];
        if (items) {
            items.items.map((item: any) => {
                ROWS.push(createData(item.id, item.name, item.start_price, item.current_bid, new Date(item.starting_Date), new Date(item.endOfAuction), item.image));
            });
        }
        setRows(ROWS);
    }, [items]);

    useEffect(() => {
        console.log("list of selected items ", selected)
    }, [selected])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            console.log(newSelected)
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        console.log("id", id)
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <ToastContainer />
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows as any, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id as number);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    if (!row) return <></>
                                    return (
                                        <TableRow
                                            sx={{ cursor: 'pointer' }}
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}

                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.id as number)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="right">{row.id}</TableCell>

                                            <TableCell

                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.start_price}</TableCell>
                                            <TableCell align="right">{row.current_bid}</TableCell>
                                            <TableCell align="right">{row.starting_Date.toLocaleString()}</TableCell>
                                            <TableCell align="right">{row.endOfAuction.toLocaleString()}</TableCell>
                                            <TableCell align="right" sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                                                <CustomButton onClick={() => { navigate(`/items/${row.id}`) }} sx={{ mr: '10px', ":hover": { backgroundColor: "green" } }}>detail</CustomButton>
                                                <EditItem id={parseInt(row.id as string)} />
                                                <MessageBox component={<img src={`${BASE_URL}${row.image}`} style={{ height: "400px" }} />} >
                                                    <CustomButton sx={{ mr: '10px', ":hover": { backgroundColor: "green" } }}><PhotoSizeSelectActualIcon /> </CustomButton>
                                                </MessageBox>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}