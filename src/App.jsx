import { Layout } from "antd"
import MainFooter from "./layouts/MainFooter"
import MainSidebar from "./layouts/MainSidebar"
import MainContent from "./layouts/MainContent"
import MainHeader from "./layouts/MainHeader"

function App() {
  return (
    <>
      <Layout className="h-screen">
        <MainHeader />
        <Layout>
          <MainSidebar />
          <MainContent />
        </Layout>
        {/* <MainFooter /> */}
      </Layout>
    </>
  )
}

export default App
