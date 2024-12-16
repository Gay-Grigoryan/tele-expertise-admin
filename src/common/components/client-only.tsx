import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";

function ClientOnly({ children }: PropsWithChildren<unknown>) {
  return <>{children}</>;
}

export const withClientOnly: <T>(_: React.FC<T>) => React.ComponentType<T> = Component => {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false
  });
};

export default withClientOnly(ClientOnly);
