import React, { forwardRef } from "react"
import MaterialTable from "material-table"
import AddBox from "@material-ui/icons/AddBox"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"
import { Add, Delete, Save } from "@material-ui/icons"
import AlertFlex from "../../../UtilityComponents/AlertFlex"
import ConfirmationDialog from "../../../UtilityComponents/ConfirmationDialog"
import SalesUpdateCard from "../SalesUpdateCard"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
}

const MaterialGrid = ({ handleOpen, sales, deleteSales, updateSales }) => {
  const tableRef = React.useRef(null)
  const [errorAlert, setErrorAlert] = React.useState(false)
  const [salesDeleteDialog, setSalesDeleteDialog] = React.useState(false)
  const [salesUpdateDialog, setSalesUpdateDialog] = React.useState(false)
  const [selectedSales, setSelectedSales] = React.useState([])
  const [salesValues, setSalesValues] = React.useState({
    uid: "",
    value: "",
    salesman: "",
    student: "",
    course: "",
    upfrontValue: "",
    installments: "",
  })

  const handleErrorAlertClose = () => {
    setErrorAlert(false)
  }

  const handleSalesDeleteDialogOpen = () => {
    setSalesDeleteDialog(true)
  }

  const handleSalesDeleteDialogClose = () => {
    setSalesDeleteDialog(false)
  }

  const salesDeleteCallback = () => {
    let salesArray = []

    selectedSales.forEach(sale => {
      salesArray.push(sale.uid)
    })

    deleteSales(salesArray)
  }

  const handleSalesUpdateDialogOpen = () => {
    setSalesUpdateDialog(true)
  }

  const handleSalesUpdateDialogClose = () => {
    setSalesUpdateDialog(false)
  }

  return (
    <div>
      <SalesUpdateCard
        salesValues={salesValues}
        open={salesUpdateDialog}
        handleClose={handleSalesUpdateDialogClose}
        updateSales={updateSales}
      ></SalesUpdateCard>
      <ConfirmationDialog
        open={salesDeleteDialog}
        type="warning"
        dialogClose={handleSalesDeleteDialogClose}
        callback={salesDeleteCallback}
        message="Atenção, esta ação é irreversível. Você está prestes a deletar registros de venda"
      ></ConfirmationDialog>
      <AlertFlex
        autoHideDuration={3000}
        severity="error"
        open={errorAlert}
        message={"Por favor, edite apenas 1 entrada por vez"}
        handleClose={handleErrorAlertClose}
      ></AlertFlex>
      <MaterialTable
        onSelectionChange={data => {
          setSelectedSales(data)
        }}
        tableRef={tableRef}
        localization={{
          body: {
            emptyDataSourceMessage: "Nenhum registro encontrado",
          },
          toolbar: {
            searchTooltip: "Procurar por um campo específico",
            searchPlaceholder: "Pesquisar",
            nRowsSelected: "{0} vendas selecionados",
          },
          pagination: {
            labelRowsSelect: "linhas sendo exibidas",
            labelDisplayedRows: "{count} de {from}-{to}",
            firstTooltip: "Primeira página",
            lastTooltip: "Última página",
            nextTooltip: "Próxima página",
            previousTooltip: "Página anterior",
          },
          header: {
            actions: "Ações",
          },
        }}
        icons={tableIcons}
        title="Vendas"
        columns={[
          { title: "Valor", field: "value" },
          { title: "Vendedor", field: "salesman" },
          { title: "Aluno", field: "student" },
          { title: "Curso", field: "course" },
          {
            title: "Entrada",
            field: "upfrontValue",
          },
          { title: "Parcelas", field: "installments" },
        ]}
        data={sales}
        actions={[
          {
            icon: Edit,
            tooltip: "Editar uma venda",
            onClick: (event, rowData) => {
              if (tableRef.current.dataManager.selectedCount > 1) {
                console.log("Edite apenas 1 por vez")
                setErrorAlert(true)
              } else {
                handleSalesUpdateDialogOpen()
                setSalesValues(rowData[0])

                console.log(rowData[0], 'what')
              }
            },
          },
          {
            icon: Add,
            tooltip: "Adicionar venda",
            isFreeAction: true,
            onClick: handleOpen,
          },
          rowData => ({
            icon: Delete,
            tooltip: "Excluir uma venda",
            onClick: (event, rowData) => {
              handleSalesDeleteDialogOpen()
            },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          selection: true,
        }}
      />
    </div>
  )
}

export default MaterialGrid
