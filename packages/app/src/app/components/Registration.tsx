import { Box, Button } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useRef, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

export default function Registration() {
  const [file, setFile] = useState<File | null>(null);
  const [createMe, { loading }] = useMutation(
    gql`
      mutation CreateUser($input: CreateMeInput!) {
        createMe(input: $input) {
          field
        }
      }
    `,
    {
      context: {
        headers: {
          'apollo-require-preflight': true,
        },
      },
      fetchPolicy: 'network-only',
    }
  );
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box component="form" autoComplete="off">
      <Box display="flex" gap={3} mt={2} alignItems="center">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          gap={1}
        >
          <MuiFileInput
            inputRef={inputRef}
            sx={{ display: 'none' }}
            value={file}
            onChange={(newFile) => setFile(newFile)}
          />
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => inputRef.current?.click()}
          >
            Select a file
          </Button>
        </Box>
      </Box>

      <LoadingButton
        variant="contained"
        color="primary"
        loading={loading}
        onClick={() =>
          createMe({ variables: { input: { field: 'hello', file } } })
        }
      >
        Send
      </LoadingButton>
    </Box>
  );
}
