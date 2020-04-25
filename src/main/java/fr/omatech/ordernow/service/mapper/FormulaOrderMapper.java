package fr.omatech.ordernow.service.mapper;


import fr.omatech.ordernow.domain.*;
import fr.omatech.ordernow.service.dto.FormulaOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link FormulaOrder} and its DTO {@link FormulaOrderDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, OrderMapper.class})
public interface FormulaOrderMapper extends EntityMapper<FormulaOrderDTO, FormulaOrder> {

    @Mapping(source = "order.id", target = "orderId")
    FormulaOrderDTO toDto(FormulaOrder formulaOrder);

    @Mapping(target = "removeListProduct", ignore = true)
    @Mapping(source = "orderId", target = "order")
    FormulaOrder toEntity(FormulaOrderDTO formulaOrderDTO);

    default FormulaOrder fromId(Long id) {
        if (id == null) {
            return null;
        }
        FormulaOrder formulaOrder = new FormulaOrder();
        formulaOrder.setId(id);
        return formulaOrder;
    }
}
