import { TablesLayout } from "../../../components"
import { ReportsTable } from "../components/ReportsTable"

export const AllReportsPage = () => {
  return (
    <TablesLayout roles={["OPERATOR", "DISPATCHER"]}>
      <ReportsTable/>
    </TablesLayout>
  )
}
