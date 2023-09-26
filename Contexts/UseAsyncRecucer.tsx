import { Reducer, useReducer } from "react";

function useAsyncReducer<R extends Reducer<T, A>, T, A>(
  reducer: R,
  initialState: T
): [T, (action: A) => Promise<void>] {
  const [state, dispatch] = useReducer<Reducer<T, A>>(
    reducer as Reducer<T, A>,
    initialState
  );

  const asyncDispatch = async (action: A) => {
    await Promise.resolve(); 
    dispatch(action);
  };

  return [state, asyncDispatch];
}

export default useAsyncReducer;
