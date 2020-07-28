import React, { useState, useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Header, HeaderContent, Content, Section } from './styles';
import Table from '../../components/Table';

interface Call {
  origin: string;
  destination: string;
  minutes: number;
  plan: string;
  plan_price: number;
  noplan_price: number;
}

interface LisCallsFormData {
  origin: string;
  destination: string;
  minutes: number;
  plan?: string;
}

const Dashboard: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: LisCallsFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          origin: Yup.string().required(),
          destination: Yup.string().required(),
          minutes: Yup.number().required(),
          plan: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { origin, destination, minutes, plan } = data;

        await api
          .post('calls', {
            origin,
            destination,
            minutes,
            plan,
          })
          .then((response) => {
            setCalls(response.data);
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na consulta',
          description:
            'Ocorreu um erro ao consultar os dados, verifique os parâmetros.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <h1>FaleMais - Telzir</h1>
        </HeaderContent>
      </Header>
      <Content>
        <Section>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <p>Simule seu plano</p>

            <Input name="origin" placeholder="(DDD): Origem" />

            <Input name="destination" placeholder="(DDD): Destino" />

            <Input name="minutes" placeholder="Minutos" />

            <Input name="plan" placeholder="Plano" />

            <Button type="submit">Pesquisar</Button>
          </Form>
        </Section>
        <Table {...calls} />
      </Content>
    </Container>
  );
};

export default Dashboard;
