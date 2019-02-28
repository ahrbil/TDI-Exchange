import React, { Suspense } from "react";

import { EditorContentLoader } from "../loader";

const RichEditorLazy = React.lazy(() => import("./editor"));

const RichEditor = props => (
  <Suspense fallback={<EditorContentLoader />}>
    <RichEditorLazy {...props} />
  </Suspense>
);

export default RichEditor;
