import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import { CameraPage } from "./views/camera/CameraPage/CameraPage";
import { ResultPage } from "./views/result/ResultPage/ResultPage";
import { Provider } from "react-redux";
import store from './store/rootReducer'

const router = createBrowserRouter([
  {
    path: "/",
    element: <CameraPage />,
  },
  {
    path: "result",
    element: <ResultPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <FluentProvider theme={webDarkTheme}>
        <RouterProvider router={router} />
      </FluentProvider>
    </Provider>
  );
}

export default App;
