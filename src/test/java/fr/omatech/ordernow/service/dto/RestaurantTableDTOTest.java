package fr.omatech.ordernow.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.omatech.ordernow.web.rest.TestUtil;

public class RestaurantTableDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RestaurantTableDTO.class);
        RestaurantTableDTO restaurantTableDTO1 = new RestaurantTableDTO();
        restaurantTableDTO1.setId(1L);
        RestaurantTableDTO restaurantTableDTO2 = new RestaurantTableDTO();
        assertThat(restaurantTableDTO1).isNotEqualTo(restaurantTableDTO2);
        restaurantTableDTO2.setId(restaurantTableDTO1.getId());
        assertThat(restaurantTableDTO1).isEqualTo(restaurantTableDTO2);
        restaurantTableDTO2.setId(2L);
        assertThat(restaurantTableDTO1).isNotEqualTo(restaurantTableDTO2);
        restaurantTableDTO1.setId(null);
        assertThat(restaurantTableDTO1).isNotEqualTo(restaurantTableDTO2);
    }
}
