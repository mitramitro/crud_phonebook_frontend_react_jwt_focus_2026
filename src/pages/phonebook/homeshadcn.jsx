import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TestTable() {
  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>No HP</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Budi</TableCell>
            <TableCell>08123456789</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>Siti</TableCell>
            <TableCell>08987654321</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
