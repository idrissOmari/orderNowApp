package fr.omatech.ordernow.service.mapper;


import fr.omatech.ordernow.domain.*;
import fr.omatech.ordernow.service.dto.OrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {


    @Mapping(target = "listProductOrders", ignore = true)
    @Mapping(target = "removeListProductOrder", ignore = true)
    @Mapping(target = "listFormulaOrders", ignore = true)
    @Mapping(target = "removeListFormulaOrder", ignore = true)
    @Mapping(target = "listTables", ignore = true)
    @Mapping(target = "removeListTable", ignore = true)
    Order toEntity(OrderDTO orderDTO);

    default Order fromId(Long id) {
        if (id == null) {
            return null;
        }
        Order order = new Order();
        order.setId(id);
        return order;
    }
}
