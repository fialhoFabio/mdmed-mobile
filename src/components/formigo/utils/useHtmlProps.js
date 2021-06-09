import {useMemo} from 'react';
import {
  MASK_CNPJ,
  MASK_CPF,
  MASK_CURRENCY,
  MASK_DATE,
  MASK_DATE_HOUR,
  MASK_HOUR,
  MASK_PHONE_NUMBER,
} from '../../../utils/masks';

export function resolveValue (value) {
  const resolvedValue = value === null || typeof value === 'undefined' ? '' : value;
  // Booleano precisa resolver inteiro 0/1 porque false num hidden, por exemplo vai como 'false' que o php considera true
  return typeof resolvedValue === 'boolean' ? +resolvedValue : resolvedValue;
}

function resolveMaxLength ({dbColumnSchema, mask}) {
  let resolvedMaxLength = null;
  switch (dbColumnSchema.dbType) {
    case 'smallint':
    case 'int2':
    case 'float2':
      // metaDataSize = 5; // esse tipo aceita 5 digitos, mas só até o numero 32767, entao pra nao precisar
      // validar o valor em si, a gente usa com um dígito a menos que nunca vai dar ruim
      resolvedMaxLength = 4;
      break;
    case 'integer':
    case 'int4':
    case 'float4':
      // metaDataSize = 10; // esse tipo aceita 10 digitos, mas só até o numero 2147483647, entao pra nao precisar
      // validar o valor em si, a gente usa com um dígito a menos que nunca vai dar ruim
      resolvedMaxLength = 9;
      break;
    case 'bigint':
    case 'int8':
    case 'float8':
      // metaDataSize = 19; // esse tipo aceita 19 digitos, mas só até o numero 9223372036854775807, entao pra
      // nao precisar validar o valor em si, a gente usa com um dígito a menos que nunca vai dar ruim
      resolvedMaxLength = 18;
      break;
    default:
  }
  if (resolvedMaxLength) {
    switch (mask) {
      case 'currency':
        resolvedMaxLength -= 3; // desconsidera a vírgula e as duas casas decimais
        resolvedMaxLength -= parseInt((resolvedMaxLength / 3)); // ajusta o tamanho máximo por causa dos pontos
        break;
      case 'float':
        // desconsidera a vírgula e as duas casas decimais pra garantir uma sobra
        resolvedMaxLength -= 3;
        break;
      default:
    }
  } else {
    resolvedMaxLength = dbColumnSchema.size;
  }
  return resolvedMaxLength;
}

function resolvePlaceholder ({label, mask, placeholder}) { // senão modelLabels
  let resolvedPlaceholder = null;
  if (placeholder !== null) {
    switch (mask) {
      case MASK_CNPJ:
        resolvedPlaceholder = placeholder || '__.___.___/____-__';
        break;
      case MASK_CPF:
        resolvedPlaceholder = placeholder || '___.___.___-__';
        break;
      case MASK_DATE:
        resolvedPlaceholder = placeholder || '__/__/_____';
        break;
      case MASK_HOUR:
        resolvedPlaceholder = placeholder || '__:__';
        break;
      case MASK_DATE_HOUR:
        resolvedPlaceholder = placeholder || '__/__/_____ __:__';
        break;
      case MASK_PHONE_NUMBER:
        resolvedPlaceholder = placeholder || '__ ____-____';
        break;
      case MASK_CURRENCY:
        resolvedPlaceholder = placeholder || '0,00';
        break;
      default:
        resolvedPlaceholder = placeholder || label;
    }
  }
  return resolvedPlaceholder;
}

export function resolveAttributeName (attribute) {
  if (attribute.length === 1) {
    return attribute[0];
  } else {
    // replace substitui só a primeira ocorrência de ][
    // a primeira expressão retorna ModelName][prop1][prop2]
    // o replace dexa a string ModelName[prop1][prop2]
    return (attribute.join('][') + ']').replace('][', '[');
  }
}

function useHtmlProps (params) {
  const {
    attribute,
    label,
    mask,
    maxLength,
    modelLabels,
    modelSchema,
    placeholder,
    shouldUseModelSchemaMaxLength,
  } = params;
  return useMemo(() => {
    const htmlProps = {};

    // Quando o atributo tem um ídem só, é um campo sem model
    const modelName = attribute.length === 1 ? null : attribute[0];
    const attributeName = modelName ? attribute[1] : attribute[0];

    // id, name
    htmlProps.id = attribute.join('_');
    htmlProps.name = resolveAttributeName(attribute);

    // label, placeholder
    const modelLabel = modelName && modelLabels ? modelLabels[attributeName] : null;
    if (placeholder !== null) {
      htmlProps.placeholder = resolvePlaceholder({label, mask, placeholder}) || modelLabel;
    }
    if (label !== null) {
      // Mesmo tendo "label ||" aqui, precisa ter também no InputWrapper, a propriedade que pode mudar condicionalmente
      htmlProps.label = label || modelLabel;
    }

    // maxLength
    if (maxLength) {
      htmlProps.maxLength = maxLength;
    } else if (modelName && shouldUseModelSchemaMaxLength) {
      const dbColumnSchema = modelSchema[attributeName];
      if (dbColumnSchema) {
        htmlProps.maxLength = resolveMaxLength({dbColumnSchema, mask});
      }
    }

    return htmlProps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useHtmlProps;
