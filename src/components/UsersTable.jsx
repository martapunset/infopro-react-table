import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { getUsers } from "../api/fetchUsers";

export const UsersTable = () => {
  const [data, setData] = useState(null);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await getUsers();
      console.log(response);
      setData(response);
      console.log(data);
    }
    fetchData();
  }, []);

  const filteredData = data?.filter((row) =>
    Object.values(row)
      .join("")
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  );

  const sortedData = filteredData?.sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];
    console.log();
    console.log(columnB);
    console.log(columnA);

    if (sortDirection === "asc") {
      return columnA?.toString().localeCompare(columnB.toString());
    } else if (sortDirection === "desc") {
      return columnB?.toString().localeCompare(columnA.toString());
    }
    //for numbers
    if (sortDirection === "ascNum") {
      return columnA > columnB ? 1 : -1;
    } else if (sortDirection === "descNum") {
      return columnB > columnA ? 1 : -1;
    }
  });

  const handleSortNumber = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "ascNum" ? "descNum" : "ascNum");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <TableWrapper>
      <TableHeader>
        <TableRow>
          <TableData onClick={() => handleSortNumber("id")}>
            {sortColumn === "id" && sortDirection === "ascNum" ? "▲" : " "}
            {sortColumn === "id" && sortDirection === "descNum" ? "▼" : " "}
            Id usuario
          </TableData>
          <TableData onClick={() => handleSortNumber("codigo_usuario")}>
            {sortColumn === "codigo_usuario" && sortDirection === "ascNum"
              ? "▲"
              : " "}
            {sortColumn === "codigo_usuario" && sortDirection === "descNum"
              ? "▼"
              : " "}
            Código de usuario
          </TableData>
          <TableData onClick={() => handleSort("nombre_usuario")}>
            {sortColumn === "nombre_usuario" && sortDirection === "asc"
              ? "▲"
              : " "}
            {sortColumn === "nombre_usuario" && sortDirection === "desc"
              ? "▼"
              : " "}
            Nombre de usuario
          </TableData>
          <TableData onClick={() => handleSort("contrasena")}>
            {sortColumn === "contrasena" && sortDirection === "asc" ? "▲" : " "}
            {sortColumn === "contrasena" && sortDirection === "desc"
              ? "▼"
              : " "}
            Contraseña
          </TableData>
          <TableData onClick={() => handleSort("fecha_alta")}>
            {sortColumn === "fecha_alta" && sortDirection === "asc" ? "▲" : " "}
            {sortColumn === "fecha_alta" && sortDirection === "desc"
              ? "▼"
              : " "}
            Fecha de alta
          </TableData>
          <TableData onClick={() => handleSort("activo")}>
            {sortColumn === "activo" && sortDirection === "asc" ? "▲" : " "}
            {sortColumn === "activo" && sortDirection === "desc" ? "▼" : " "}
            Activo
          </TableData>
        </TableRow>
      </TableHeader>
      <tbody>
        {sortedData.map((row) => (
          <TableRow key={row.id}>
            <TableData>{row.id}</TableData>
            <TableData>{row.codigo_usuario}</TableData>
            <TableData>{row.nombre_usuario}</TableData>
            <TableData>{row.contrasena}</TableData>
            <TableData>{row.fecha_alta}</TableData>
            <TableData>{row.activo ? "Si" : "No"}</TableData>
          </TableRow>
        ))}
      </tbody>
    </TableWrapper>
  );
};

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
  font-weight: bold;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableData = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;
