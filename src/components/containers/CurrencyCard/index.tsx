import './styles.scss';
import { Converter } from '@/components/containers';
import { Modal, ModalBody, ModalButton, ModalContent, ModalHeader } from '@/components/ui';
import type { CurrencyData } from '@/types/currencies';

interface CurrencyCardProps extends CurrencyData {}

export default function CurrencyCard({ code, value, iconUrl }: CurrencyCardProps) {
  return (
    <Modal>
      <ModalButton>
        {({ handleOpen }) => (
          <div className='currency-card' onClick={handleOpen}>
            <img className='currency-card__icon' src={iconUrl} alt={`${code}-icon`} />
            <div className='currency-card__info'>
              <h4 className='currency-card__info__name'>{code}</h4>
              <p className='currency-card__info__rate'>$ {value}</p>
            </div>
          </div>
        )}
      </ModalButton>
      <ModalContent>
        <ModalHeader title='Convert' />
        <ModalBody>
          <Converter targetCurrency={code} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
