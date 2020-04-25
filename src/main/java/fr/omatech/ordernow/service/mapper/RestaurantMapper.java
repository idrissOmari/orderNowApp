package fr.omatech.ordernow.service.mapper;


import fr.omatech.ordernow.domain.*;
import fr.omatech.ordernow.service.dto.RestaurantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Restaurant} and its DTO {@link RestaurantDTO}.
 */
@Mapper(componentModel = "spring", uses = {AddressMapper.class})
public interface RestaurantMapper extends EntityMapper<RestaurantDTO, Restaurant> {

    @Mapping(source = "address.id", target = "addressId")
    RestaurantDTO toDto(Restaurant restaurant);

    @Mapping(source = "addressId", target = "address")
    @Mapping(target = "listTables", ignore = true)
    @Mapping(target = "removeListTables", ignore = true)
    @Mapping(target = "listMenus", ignore = true)
    @Mapping(target = "removeListMenu", ignore = true)
    Restaurant toEntity(RestaurantDTO restaurantDTO);

    default Restaurant fromId(Long id) {
        if (id == null) {
            return null;
        }
        Restaurant restaurant = new Restaurant();
        restaurant.setId(id);
        return restaurant;
    }
}
