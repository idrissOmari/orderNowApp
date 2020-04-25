package fr.omatech.ordernow.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class RestaurantTableMapperTest {

    private RestaurantTableMapper restaurantTableMapper;

    @BeforeEach
    public void setUp() {
        restaurantTableMapper = new RestaurantTableMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(restaurantTableMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(restaurantTableMapper.fromId(null)).isNull();
    }
}
