import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openNotification } from "../../util/notification";
import productService from "./productService";

const userLogin = JSON.parse(localStorage.getItem('admin'))
const initialState = {
    products: [],
    product: [],
    message: '',
    isSuccess: false,
    isError: false
}

export const createProduct = createAsyncThunk('product/create',async (productData, thunkAPI) => {
    try {
        const token = userLogin.accessToken;
        const response = await productService.createProduct(productData, token)
        if (response.success) {
          openNotification("success", "Success", response.message);
          return response;
        } else {
          openNotification("error", "Error", response.message);
        }
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
})
export const updateProduct = createAsyncThunk('product/update', async (productData,thunkAPI) => {
  try {
    const token = userLogin.accessToken;
    const response = await productService.updateProduct(productData, token, productData.params.id)
    if (response) {
      openNotification('success', 'Success', response.message)
      return response
    } else {
      openNotification("error", "Error", response.message);
    }
  } catch (error) {
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString()

  return thunkAPI.rejectWithValue(message)
  }
})
export const getProduct = createAsyncThunk(
    'product/getAllProduct',
    async (_, thunkAPI) => {
      try {
        const token = userLogin.accessToken;
        return await productService.getProduct(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
  export const getProductById = createAsyncThunk(
    'product/getProductById',
    async (id, thunkAPI) => {
      try {
        const token = userLogin.accessToken;
        return await productService.getProductById(id,token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
  export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (id, thunkAPI) => {
      try {
        const token = userLogin.accessToken;
        const response = await productService.deleteProduct(id, token);
        if (response.success) {
          openNotification("success", "Success", response.message);
          return response;
        } else {
          openNotification("error", "Error", response.message);
        }
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  export const findProductByType = createAsyncThunk(
    "product/find",
    async (type, thunkAPI) => {
      try {
        const token = userLogin.accessToken;
        const response = await productService.findProductByType(type, token);
        if (response.success) {
          openNotification("success", "Success", response.message);
          return response;
        } else {
          openNotification("error", "Error", response.message);
        }
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createProduct.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.products =action.payload
        })
        .addCase(createProduct.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.products = null
        })
        .addCase(getProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getProduct.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.products = action.payload
        })
        .addCase(getProduct.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.products = null

        }).addCase(getProductById.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getProductById.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.product = action.payload
        })
        .addCase(getProductById.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.product = null

        })
        .addCase(updateProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.products = action.payload
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.products = null
        })
        .addCase(deleteProduct.pending, (state) => {
          state.isLoading = true
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.products = action.payload
        })
        .addCase(deleteProduct.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.products = null
        })
        .addCase(findProductByType.pending, (state) => {
          state.isLoading = true
        })
        .addCase(findProductByType.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.products = action.payload
        })
        .addCase(findProductByType.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.products = null

        })
    },
  })
  
  export const { reset } = productSlice.actions
  export default productSlice.reducer