export const gatewayFormSchemas = {
  PAGARME: {
    sections: [
      {
        title: 'Dados da integração',
        fields: [
          {
            id: 'publicKey',
            label: 'Public key',
            type: 'text',
            placeholder: 'Informe a public key',
            required: true,
            size: 'half-width-large',
          },
          {
            id: 'secretKey',
            label: 'Secret key',
            type: 'text',
            placeholder: 'Informe a secret key',
            required: true,
            size: 'half-width-large',
          },
        ],
      },
    ],
    normalizeConfig: (formData) => ({
      publicKey: formData.publicKey?.trim() || '',
      secretKey: formData.secretKey?.trim() || '',
    }),
    validateConfig: (formData) => {
      if (!formData.publicKey?.trim()) {
        return 'A public key é obrigatória.';
      }

      if (!formData.secretKey?.trim()) {
        return 'A secret key é obrigatória.';
      }

      return null;
    },
  },
};