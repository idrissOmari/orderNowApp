package fr.omatech.ordernow.service.mapper;


import fr.omatech.ordernow.domain.*;
import fr.omatech.ordernow.service.dto.RestaurantTableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link RestaurantTable} and its DTO {@link RestaurantTableDTO}.
 */
@Mapper(componentModel = "spring", uses = {RestaurantMapper.class, OrderMapper.class})
public interface RestaurantTableMapper extends EntityMapper<RestaurantTableDTO, RestaurantTable> {

    @Mapping(source = "restaurant.id", target = "restaurantId")
    @Mapping(source = "order.id", target = "orderId")
    RestaurantTableDTO toDto(RestaurantTable restaurantTable);

    @Mapping(source = "restaurantId", target = "restaurant")
    @Mapping(source = "orderId", target = "order")
    RestaurantTable toEntity(RestaurantTableDTO restaurantTableDTO);

    default RestaurantTable fromId(Long id) {
        if (id == null) {
            return null;
        }
        RestaurantTable restaurantTable = new RestaurantTable();
        restaurantTable.setId(id);
        return restaurantTable;
    }
}
