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
import AlertFlex from "../../UtilityComponents/AlertFlex"

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

const MaterialGrid = () => {
  const tableRef = React.useRef(null)
  const [errorAlert, setErrorAlert] = React.useState(false)

  const handleErrorAlertClose = () => {
    setErrorAlert(false)
  }

  return (
    <div>
      <AlertFlex
        autoHideDuration={3000}
        severity="error"
        open={errorAlert}
        message={"Por favor, edite apenas 1 entrada por vez"}
        handleClose={handleErrorAlertClose}
      ></AlertFlex>
      <MaterialTable
        tableRef={tableRef}
        localization={{
          body: {
            emptyDataSourceMessage: "Nenhum registro encontrado",
          },
          toolbar: {
            searchTooltip: "Procurar por um campo específico",
            searchPlaceholder: "Pesquisar",
            nRowsSelected: "{0} vendedor selecionados",
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
        title="Vendedores"
        columns={[
          { title: "Nome", field: "name" },
          { title: "Sobrenome", field: "surname" },
          { title: "Data de nascimento", field: "birthYear", type: "numeric" },
          {
            title: "Cidade de residência",
            field: "birthCity",
            // lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
          },
        ]}
        data={[
          {
            name: "tchau tchau",
            surname: "Baran",
            birthYear: 1987,
            birthCity: "Porto Alegre",
          },
          {
            name: "Alo alo",
            surname: "Baran",
            birthYear: 2017,
            birthCity: "São Paulo",
          },
          {
            name: "Ola ola",
            surname: "Baran",
            birthYear: 2017,
            birthCity: "São Paulo",
          },
          {
            name: "Zerya Betül",
            surname: "Baran",
            birthYear: 2017,
            birthCity: "Alagoas",
          },
          {
            name: "Zerya Betül",
            surname: "Baran",
            birthYear: 2017,
            birthCity: "São Paulo",
          },
          {
            name: "Zerya Betül",
            surname: "Baran",
            birthYear: 2017,
            birthCity: "São Paulo",
          },
          {
            name: "Zerya Betül",
            surname: "Baran",
            birthYear: 2017,
            birthCity: "São Paulo",
          },
          {
            name: "Zerya Betül",
            surname: "Baran",
            birthYear: 2017,
            birthCity: "São Paulo",
          },
        ]}
        actions={[
          {
            icon: Edit,
            tooltip: "Editar um vendedor",
            onClick: (event, rowData) => {
              if (tableRef.current.dataManager.selectedCount > 1) {
                console.log("Edite apenas 1 por vez")
                setErrorAlert(true)
              } else {
                console.log("Good job")
              }
            },
          },
          {
            icon: Add,
            tooltip: "Adicionar vendedor",
            isFreeAction: true,
            onClick: event => alert("You clicked to add a user"),
          },
          rowData => ({
            icon: Delete,
            tooltip: "Delete User",
            onClick: (event, rowData) =>
              window.confirm("You want to delete " + rowData.birthCity),
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
